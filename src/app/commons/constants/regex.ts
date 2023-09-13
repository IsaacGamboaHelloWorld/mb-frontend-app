export const NO_REPEATED_MORE_THAN_TWO_TIMES: RegExp = new RegExp(
  '^(?=[\\D]*\\d)(?=.{4,4})(?!.*([0-9])\\1{2})(?!.*([0-9])(?:.*?\\2){2,}).*$'
);
