export interface ApiData {
  data?: { [key: string]: any }[] | null;
}

export interface RuleObject {
  field?: string;
  operation?: string;
  value?: string;
  isValidated?: boolean;
}

export interface RuleAction {
  type:
    | "add_rule"
    | "add_and_rule"
    | "add_or_rule"
    | "delete_and_rule"
    | "delete_or_rule";
  andIndex: number;
  orIndex?: number;
  newRule?: RuleObject;
}

export interface RuleState {
  data: RuleObject[][];
}
