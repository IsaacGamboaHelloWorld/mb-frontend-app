import { filter, map, take } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ModalService } from '@commons/services/modal.service';
import { IContentExperience } from '@modules/experience/entities/experience.entities';
import { ExperienceFacade } from '@modules/experience/experience.facade';
import { SecurityService } from '@commons/security/services/security.service';
import { mapExperience } from '@modules/experience/mappers/experience.mapper';
import { ExperienceService } from '@modules/experience/services/experience.service';
import { AuthService } from '@commons/services/auth/auth.service';
import { StepExperienceType } from '@modules/experience/constants/steps';

export abstract class AbstractExperienceComponent {
  public modalService: ModalService;
  protected experienceService: ExperienceService;
  protected authService: AuthService;
  protected facade: ExperienceFacade;
  protected securityService: SecurityService;

  protected constructor(protected injector: Injector) {
    this.modalService = injector.get(ModalService);
    this.facade = injector.get(ExperienceFacade);
    this.securityService = injector.get(SecurityService);
    this.experienceService = injector.get(ExperienceService);
    this.authService = injector.get(AuthService);
  }

  get isLoading$(): Observable<boolean> {
    return this.facade.contentExperience$.pipe(map((data) => data.loading));
  }

  get step$(): Observable<string> {
    return this.facade.contentExperience$.pipe(
      map((data) => data?.content?.step)
    );
  }

  get showSkeleton$(): Observable<boolean> {
    return this.facade.contentExperience$.pipe(
      filter(
        (data) => data?.content?.step === StepExperienceType.INIT_PIN_OTP_FLOW
      ),
      map((data) => data?.loading)
    );
  }

  public submitExperience(
    form: FormGroup,
    excludeValidate: boolean = false
  ): void {
    (excludeValidate || form.valid) && this.submitForm(form.value);
  }

  public closeModal(): void {
    this.modalService.close();
  }

  protected submitForm(form: IContentExperience): void {
    zip(
      this.securityService.initializeSecurityKeys$(),
      this.authService.getServerPublicKey(),
      this.facade.contentExperience$
    )
      .pipe(take(1))
      .subscribe(
        ([security, key, experience]) => {
          mapExperience(experience.content, form, key.publicKey, this.facade);
        },
        (_) => {
          this.facade.setErrorExperience();
        }
      );
  }
}
