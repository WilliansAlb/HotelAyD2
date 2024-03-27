import { AdmCategory } from 'src/app/models/adm.model';

export class Food {
  public foodId!: number;
  public catFoodType!: AdmCategory;
  public foodName!: string;
  public foodDescription!: string;
  public foodPrice!: number;
  public foodIngredients!: string;
  public attachementUrl!: string;
}
