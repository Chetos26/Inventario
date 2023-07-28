export interface CategoryModel {
  id_c: string;
  nombre_c: string;
}

export interface CreateCategoryModel extends  Omit<CategoryModel, 'id_c'>{
}

export interface UpdateCategoryModel extends Partial<CategoryModel>{
  id_c: string;
}
