import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalService } from '@commons/services/modal.service';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { ITaxesCity } from '@modules/payments/entities/tax-payment.entities';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { ITaxesCitiesState } from '@modules/payments/store/payments.state';

@Component({
  selector: 'app-city-finder',
  templateUrl: './city-finder.component.html',
  styleUrls: ['./city-finder.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaymentsFacade, FormBuilder]
})
export class CityFinderComponent implements OnInit, OnDestroy {
  @Input() control: FormControl;

  public formCityFinder: FormGroup;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public loading: number = 3;

  constructor(
    private modalService: ModalService,
    private facade: PaymentsFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get searchTerm(): AbstractControl {
    return this.formCityFinder.get('searchTerm');
  }

  get selectedItem(): AbstractControl {
    return this.formCityFinder.get('selectedItem');
  }

  get showWelcomeMsg(): Observable<boolean> {
    return this.cities$.pipe(
      map((data) => this.searchTerm.value === '' && !data?.error)
    );
  }

  get hasResults$(): Observable<boolean> {
    return this.cities$.pipe(
      map(
        (data) => data?.listCities?.length > 0 && !data?.error && !data?.loading
      )
    );
  }

  get cities$(): Observable<ITaxesCitiesState> {
    return this.facade.taxesCities$;
  }

  public closeModal(): void {
    this.modalService.close();
  }

  public submitForm(): void {
    if (this.formCityFinder.valid) {
      this.modalService.close(this.formCityFinder.value);
    }
  }

  public trackByTo(index: number, city: ITaxesCity): string {
    return trackBy(city, city.name);
  }

  private _initForm(): void {
    this.formCityFinder = this.fb.group({
      searchTerm: [''],
      selectedItem: ['', Validators.required]
    });
  }
}
