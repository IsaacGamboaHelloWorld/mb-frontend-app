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
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil
} from 'rxjs/operators';

import { PaymentsFacade } from '@modules/payments/payments.facade';
import { ISearchBillerState } from '@modules/payments/store/payments.state';
import { ModalService } from '@commons/services/modal.service';
import { searchBillerMapper } from '@modules/payments/new-payment/mappers/confirmation-payment-not-registered.mapper';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { IAgreement } from '@modules/payments/entities/billers.entities';

@Component({
  selector: 'app-agreement-finder',
  templateUrl: './agreement-finder.component.html',
  styleUrls: ['./agreement-finder.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaymentsFacade, FormBuilder]
})
export class AgreementFinderComponent implements OnInit, OnDestroy {
  @Input() control: FormControl;

  public formAgreementFinder: FormGroup;
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
    return this.formAgreementFinder.get('searchTerm');
  }

  get selectedItem(): AbstractControl {
    return this.formAgreementFinder.get('selectedItem');
  }

  get showWelcomeMsg(): Observable<boolean> {
    return this.resultsFound$.pipe(
      map((data) => this.searchTerm.value === '' && !data?.error)
    );
  }

  get hasResults$(): Observable<boolean> {
    return this.resultsFound$.pipe(
      map(
        (data) =>
          data?.information?.length > 0 && !data?.error && !data?.loading
      )
    );
  }

  get resultsFound$(): Observable<ISearchBillerState> {
    return this.facade.searchBiller$;
  }

  public submitForm(): void {
    if (this.formAgreementFinder.valid) {
      this.modalService.close(this.formAgreementFinder.value);
    }
  }
  public trackByTo(index: number, loan: IAgreement): string {
    return trackBy(loan, loan.organizationId);
  }

  public closeModal(): void {
    this.modalService.close();
  }

  private _initForm(): void {
    this.formAgreementFinder = this.fb.group({
      searchTerm: [''],
      selectedItem: ['', Validators.required]
    });
    this.searchTerm.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.length > 2),
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe((value) =>
        this.facade.fetchSearchBiller(searchBillerMapper(value))
      );
  }
}
