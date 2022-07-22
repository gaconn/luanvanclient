const FIELD_USER_NAME = "USER_NAME"

export const LinkPage = {
    supplier : "/manage/supplier",
    category : "/manage/category",
    product : "/manage/product",
    order: "/manage/order",
    user: "/manage/user",
    warehouse: "/manage/warehouse",
    change: "/manage/change",
    discount: "/manage/discount"
}
export const LinkSupplierAction = {
    supplier_add:LinkPage.supplier + "/add",
    supplier_list:LinkPage.supplier + "/list",
    supplier_update:LinkPage.supplier + "/update",
    supplier_delete:LinkPage.supplier + "/delete",
}

export const LinkCategoryAction = { 
    category_add:LinkPage.category + "/add",
    category_list:LinkPage.category + "/list",
    category_update:LinkPage.category + "/update",
    category_delete:LinkPage.category + "/delete",
}

export const LinkProductAction = {  
    product_add:LinkPage.product + "/add",
    product_list:LinkPage.product + "/list",
    product_update:LinkPage.product + "/update",
    product_delete:LinkPage.product + "/delete",
}

export const LinkOrderAction = {
    order_list: LinkPage.order + '/list',
    order_detail: LinkPage.order + '/detail'
}

export const LinkUserAction = {
    user_list: LinkPage.user + "/list",
    user_update: LinkPage.user + "/update"
}

export const LinkWarehouseAction = {
    in_warehouse: LinkPage.warehouse + "/in-warehouse",
    exported_warehouse: LinkPage.warehouse + "/exported-warehouse",
    import_warehouse: LinkPage.warehouse + "/import-warehouse"
}

export const LinkChangeAction = {
    change_list: LinkPage.change + "/list",
    change_insert: LinkPage.change + "/insert"
}

export const LinkDiscountAction = {
    discount_list: LinkPage.discount + "/list",
    discount_add : LinkPage.discount + "/add",
    discount_update : LinkPage.discount + "/update"
}