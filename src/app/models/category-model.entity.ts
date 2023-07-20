export interface CategoryModel {
  id: string;
  nombre_c: string;
}

export interface CreateCategoryModel extends  Omit<CategoryModel, 'id'>{
}

export interface UpdateCategoryModel extends Partial<CategoryModel>{
  id: string;
}
