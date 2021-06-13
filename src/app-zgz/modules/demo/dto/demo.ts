import { Rule, RuleType } from '@midwayjs/decorator';
export class demoDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  name: string;
}
