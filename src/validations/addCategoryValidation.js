import * as Yup from "yup";

export const addCategoryFormInitialValue = {
  name: "",
  img: "",
};

export const addCategoryValidationSchema = Yup.object({
  name: Yup.string().required("Enter your name"),
  img: Yup.string().required("Enter your img url").url("Enter a valid URL"),
});
