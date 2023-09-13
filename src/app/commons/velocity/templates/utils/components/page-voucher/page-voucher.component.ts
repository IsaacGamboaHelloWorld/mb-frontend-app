import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IVoucherTemplateEntities } from '@commons/velocity/templates/utils/entities/voucher-template.entities';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';

@Component({
  selector: 'app-page-voucher',
  templateUrl: './page-voucher.component.html',
  styleUrls: ['./page-voucher.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageVoucherComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private cd: ChangeDetectorRef,
    private saveDataTemplateService: SaveDataTemplateService,
    private configTemplateService: ConfigTemplateService
  ) {}

  ngOnInit(): void {
    if (
      this.saveDataTemplateService?.dataTemplate?.stepActive ===
      PropertyTemplate.success
    ) {
      this.saveDataTemplateService.saveDataTemplate({
        ...this.saveDataTemplateService.dataTemplate,
        finish: true
      });
    }

    this._watchAction();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._reset();
  }

  get hasBtnFirst(): boolean {
    return !!this.infoVoucher?.buttonFirst;
  }

  get hasBtnSecond(): boolean {
    return !!this.infoVoucher?.buttonSecond;
  }

  get infoVoucher(): IVoucherTemplateEntities {
    return this.saveDataTemplateService.dataTemplate[
      this.saveDataTemplateService.dataTemplate?.stepActive
    ];
  }

  public buttonPrimary(): void {
    if (this.configTemplateService.config.emitButtons) {
      this.saveDataTemplateService.setActionButtons(STATUS_BUTTONS.primary);
    } else {
      if (
        this.saveDataTemplateService?.dataTemplate?.stepActive ===
        PropertyTemplate.success
      ) {
        this.configTemplateService.changeStep(
          {
            url: this.configTemplateService?.config?.beforeUrl,
            step: 1
          },
          false
        );
      } else {
        this.saveDataTemplateService.setActionConfirm(true);
        const template: ISaveDataTemplate = {
          ...this.saveDataTemplateService.dataTemplate,
          confirmation: {
            ...this.saveDataTemplateService.dataTemplate?.confirmation,
            buttonFirst: {
              ...this.saveDataTemplateService.dataTemplate?.confirmation
                ?.buttonFirst,
              loading: true
            }
          }
        };
        this.saveDataTemplateService.saveDataTemplate(template);
      }
    }
  }

  public buttonSecondary(): void {
    if (this.configTemplateService.config.emitButtons) {
      this.saveDataTemplateService.setActionButtons(STATUS_BUTTONS.secondary);
    } else {
      this.configTemplateService.changeStep(
        this.configTemplateService?.config?.router[0]
      );
    }
  }

  private _watchAction(): void {
    this.saveDataTemplateService.updateComponent$
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => this.cd.detectChanges());
  }

  private _reset(): void {
    if (this.saveDataTemplateService.dataTemplate?.finish) {
      this.saveDataTemplateService.resetDataTemplate();
      this.configTemplateService.setStep(1);
    }
  }
}
