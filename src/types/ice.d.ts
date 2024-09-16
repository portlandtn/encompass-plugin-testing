// Defining types for Application Object
interface ApplicationDescriptor {
  id: string;
  name: string;
  version: string;
}

interface ApplicationEnvironment {
  apiHost: string;
}

interface ApplicationRoute {
  url: string;
  type: "STANDARD_FORM" | "CUSTOM_FORM" | "STANDARD_TOOL" | "CUSTOM_TOOL" | "GLOBAL_CUSTOM_TOOL" | "OTHER";
  name?: string | null;
  id?: string | null;
}

interface ApplicationContext {
  env: ApplicationEnvironment;
  route: ApplicationRoute;
}

interface PrintOptions {
  content: Blob;
}

interface NavigateOptions {
  type: string;
}

interface ActionOptions {}

interface OpenOptions {
  target: string | IOpenTarget;
  type?: string;
}

interface IOpenTarget {
  entityType: string;
  entityId: string;
}

interface ModalOptions extends OpenOptions {
  name: string;
  size: 'sm' | 'md' | 'lg';
}

interface ApplicationCapabilities {
  supportedActions: string[];
  supportedFeatures: string[];
}

interface Application {
  getApplicationContext(): Promise<ApplicationContext>;
  getDescriptor(): Promise<ApplicationDescriptor>;
  supportsAction(actionName: string): Promise<boolean>;
  getCapabilities(): Promise<ApplicationCapabilities>;
  keepSessionAlive(): Promise<void>;
  closeModal(): Promise<void>;
  navigate(options: NavigateOptions): Promise<void>;
  performAction(actionName: string, actionOptions?: ActionOptions): Promise<void>;
  open(options: OpenOptions): Promise<void>;
  openModal(options: ModalOptions): Promise<void>;
  print(options: PrintOptions): Promise<void>;
}

// Defining types for Auth Object
interface UserIdentity {
  id: string;
  realm: string;
  firstName: string;
  lastName: string;
  phone: string;
  cellPhone: string;
  personas: {
    entityId: string;
    entityType: string;
    entityName: string;
  }[];
}

interface Auth {
  createAuthCode(LOConnectClientID: string): Promise<string>;
  getUser(): Promise<UserIdentity>;
}

// Defining types for Http Object
interface HttpHeaders {
  [key: string]: string;
}

type HttpContent = string | Record<string, any>;

interface Http {
  delete(url: string, headersOrToken: HttpHeaders | string): Promise<any>;
  get(url: string, headersOrToken: HttpHeaders | string): Promise<any>;
  post(url: string, content: HttpContent, headersOrToken: HttpHeaders | string): Promise<any>;
  patch(url: string, content: HttpContent, headersOrToken: HttpHeaders | string): Promise<any>;
  put(url: string, content: HttpContent, headersOrToken: HttpHeaders | string): Promise<any>;
}

// Defining types for Loan Object
interface LoanChangeEventData {
  fieldID: string;
  newVal: any;
  oldVal: any;
}

type CommitCause = "saveButton" | "script" | string;

interface LoanFieldMap {
  [fieldId: string]: any;
}

interface Loan {
  all(): Promise<any>;
  calculate(): Promise<void>;
  commit(): Promise<void>;
  getField(fieldId: string): Promise<any>;
  isReadOnly(): Promise<boolean>;
  execAction(action: string): Promise<void>;
  merge(): Promise<void>;
  setFields(fieldMap: LoanFieldMap): Promise<void>;

  on(event: "change", callback: (data: LoanChangeEventData) => void): void;
  on(event: "close" | "open" | "commit" | "sync", callback: () => void): void;
  on(event: "precommit", callback: (data: { cause: CommitCause }) => boolean): void;
  on(event: "premilestonecomplete", callback: () => boolean): void;

  updateCorrespondentBalance(): Promise<void>;
  updateCorrespondentFees(): Promise<void>;
  copyItemizationToStateDisclosure(): Promise<void>;
  calculateEEMMortgage(): Promise<void>;
}

// Defining types for Session Object
interface Session {
  set(key: string, valueObj: any): Promise<void>;
  get(key: string): Promise<any>;
}

// Defining types for Script Object
interface Script {
  getObject<T = any>(objectName: string): Promise<T>;
  subscribe(objectName: string, eventName: string, callback: Function): Promise<void>;
}

declare global {
  var application: Application;
  var auth: Auth;
  var http: Http;
  var loan: Loan;
  var session: Session;
  var elli: {
    script: Script;
  };
}

export {};
