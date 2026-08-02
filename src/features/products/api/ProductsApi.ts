import { baseApi } from "../../../app/api/baseApi";
import { productsMock } from "../data/productsMock";
import type {
  CreateProductRequest,
  CreateProductResponse,
  GetProductsResponse,
} from "../types/Product.types";

function createProductFormData(product: CreateProductRequest): FormData {
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("sku", product.sku);
  formData.append("category", product.category);
  formData.append("description", product.description);
  formData.append("saleUnit", product.saleUnit);
  formData.append("salePrice", String(product.salePrice));
  formData.append("taxRate", String(product.taxRate));
  formData.append("isActive", String(product.isActive));
  formData.append("isAvailableForSale", String(product.isAvailableForSale));
  formData.append("trackStock", String(product.trackStock));

  if (product.estimatedCost !== undefined) {
    formData.append("estimatedCost", String(product.estimatedCost));
  }

  if (product.trackStock && product.initialStock !== undefined) {
    formData.append("initialStock", String(product.initialStock));
  }

  if (product.trackStock && product.minimumStock !== undefined) {
    formData.append("minimumStock", String(product.minimumStock));
  }

  if (product.image) {
    formData.append("image", product.image);
  }

  return formData;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, void>({
      async queryFn() {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 450);
        });

        return {
          data: {
            products: productsMock,
          },
        };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.products.map((product) => ({
                type: "Product" as const,
                id: product.id,
              })),
              {
                type: "Product",
                id: "LIST",
              },
            ]
          : [
              {
                type: "Product",
                id: "LIST",
              },
            ],
    }),

    createProduct: builder.mutation<
      CreateProductResponse,
      CreateProductRequest
    >({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: createProductFormData(product),
      }),

      invalidatesTags: [
        {
          type: "Product",
          id: "LIST",
        },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
