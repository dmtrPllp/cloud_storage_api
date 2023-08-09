import RequestWithUser from 'src/api/modules/auth/interfaces/request-with-user.interface';

export const DEV_APP_ENVIRONMENT = 'dev';
export const QA_APP_ENVIRONMENT = 'qa';
export const PROD_APP_ENVIRONMENT = 'prod';

const REQUEST_COMMON_DATA = (req: RequestWithUser) =>
  `[METHOD]: ${req.method} [URL]: ${req.baseUrl} [QUERY]: ${JSON.stringify(
    req.query,
  )}`;

const REQUEST_PAYLOADS = (req: RequestWithUser) =>
  `[BODY]: ${JSON.stringify(req.body)} [USER]: ${JSON.stringify(
    req.headers.user,
  )}`;

const REQUEST_COOKIES = (req: RequestWithUser) =>
  `[COOKIES]: ${JSON.stringify(req.cookies)}`;

const REQUEST_HEADERS = (req: RequestWithUser) =>
  `[HEADERS]: ${JSON.stringify(req.headers)}`;

const DEV_LOG = (req: RequestWithUser) => {
  return `${REQUEST_COMMON_DATA(req)} ${REQUEST_PAYLOADS(
    req,
  )} ${REQUEST_COOKIES(req)} ${REQUEST_HEADERS(req)}`;
};

const QA_LOG = (req: RequestWithUser) => {
  return `${REQUEST_COMMON_DATA(req)} ${REQUEST_PAYLOADS(req)}`;
};

const PROD_LOG = (req: RequestWithUser) => {
  return `${REQUEST_COMMON_DATA(req)}`;
};

export const getRequestInformation = (
  appEnvironment: string,
  req: RequestWithUser,
) => {
  switch (appEnvironment) {
    case DEV_APP_ENVIRONMENT:
      return DEV_LOG(req);

    case QA_APP_ENVIRONMENT:
      return QA_LOG(req);

    case PROD_APP_ENVIRONMENT:
      return PROD_LOG(req);

    default:
      return `[UNKNOWN_APP_ENVIRONMENT] ${DEV_LOG(req)}`;
  }
};
