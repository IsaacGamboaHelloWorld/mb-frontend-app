import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';

import { mapAuthEnrollment } from '@modules/auth/mappers/auth.mapper';
import { StepEnrollmentType } from '@modules/auth/constants/step';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { IEnrollmentResponse } from '@modules/auth/entities/auth.interface';
import { encryptProperties } from '@commons/helpers/encrypt-properties.helper';
import { AuthServiceMock } from '@test-helpers/mocks/facade/authService.mock';
import { Capacitor } from '@capacitor/core';

const device = require('./../../../../../test-helpers/mocks/device-info.json');

// @ts-ignore
window.rsaFunc = () => '';
const facade = new AuthFacadeMock();
const auth = new AuthServiceMock();

describe('AuthMapper', () => {
  it('should encrypt properties', () => {
    const data = encryptProperties({ universalPassword: '123456' }, '1234', [
      ''
    ]);
    expect(data).toBeDefined();
  });

  it('validate mapAuthEnrollment when step is FILL_LOGIN_CREDENTIALS', () => {
    const dataLoginCredentials: IEnrollmentResponse = {
      step: StepEnrollmentType.FILL_LOGIN_CREDENTIALS,
      processId: '1234',
      success: true
    };
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(
      dataLoginCredentials,
      {},
      '1234',
      facade as any,
      auth as any
    );
    expect(spy).toHaveBeenCalled();
  });
  it('validate mapAuthEnrollment when step is FILL_CURRENT_CHANNEL_CREDENTIALS', () => {
    const dataFillCurrentChannel: IEnrollmentResponse = {
      step: StepEnrollmentType.FILL_CURRENT_CHANNEL_CREDENTIALS,
      processId: '1234',
      success: true
    };
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(
      dataFillCurrentChannel,
      {},
      '1234',
      facade as any,
      auth as any
    );
    expect(spy).toHaveBeenCalled();
  });
  it('validate mapAuthEnrollment when step is FILL_NEW_CREDENTIALS', () => {
    const dataFillNewCredentials: IEnrollmentResponse = {
      step: StepEnrollmentType.FILL_NEW_CREDENTIALS,
      processId: '1234',
      success: true
    };
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(
      dataFillNewCredentials,
      {},
      '1234',
      facade as any,
      auth as any
    );
    expect(spy).toHaveBeenCalled();
  });
  it('validate mapAuthEnrollment when step is V2_ACCEPT_CHANNEL_POLICIES', () => {
    const dataAcceptPolicies: IEnrollmentResponse = {
      step: StepEnrollmentType.V2_ACCEPT_CHANNEL_POLICIES,
      processId: '1234',
      success: true
    };
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(
      dataAcceptPolicies,
      {},
      '1234',
      facade as any,
      auth as any
    );
    expect(spy).toHaveBeenCalled();
  });
  it('validate mapAuthEnrollment when step is FILL_SECURITY_QUESTION', () => {
    const dataFillSecurityQuestion: IEnrollmentResponse = {
      step: StepEnrollmentType.FILL_SECURITY_QUESTION,
      processId: '1234',
      success: true
    };
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(
      dataFillSecurityQuestion,
      {},
      '1234',
      facade as any,
      auth as any
    );
    expect(spy).toHaveBeenCalled();
  });
  it('validate mapAuthEnrollment when step is V2_FILL_OTP_DATA', () => {
    const dataFillOtpData: IEnrollmentResponse = {
      step: StepEnrollmentType.V2_FILL_OTP_DATA,
      processId: '1234',
      success: true
    };
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(dataFillOtpData, {}, '1234', facade as any, auth as any);
    expect(spy).toHaveBeenCalled();
  });
  it('validate mapAuthEnrollment when step is INIT', () => {
    const dataInit: IEnrollmentResponse = {
      step: StepEnrollmentType.INIT,
      processId: '1234',
      success: true
    };
    const spyAppInfo = spyOn(App, 'getInfo').and.returnValue(device.appInfo);
    const spyDevice = spyOn(Device, 'getInfo').and.returnValue(
      device.deviceInfo
    );
    const spyDeviceID = spyOn(Device, 'getId').and.returnValue(device.deviceId);
    const spy = spyOn(facade, 'fetchStartAuth');
    mapAuthEnrollment(dataInit, {}, '1234', facade as any, auth as any);
    expect(spy).toBeDefined();
  });
});
