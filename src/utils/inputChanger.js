import { validate } from "./validate";

export const inputChanger = (event, inputId, stateObject, validationType) => {
   let NEW_OBJECT = JSON.parse(JSON.stringify(stateObject));

   if (inputId) {
      NEW_OBJECT[inputId].value = event.target.value;
      NEW_OBJECT[inputId].valid = validate(
         NEW_OBJECT[inputId].value,
         validationType
      );
   }
   return NEW_OBJECT;
};
