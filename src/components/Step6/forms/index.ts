import OpenAccountForm from "./OpenAccountForm";
import UpdateDataForm from "./UpdateDataForm";
import PrintStatementForm from "./PrintStatementForm";
import BalanceCertificateForm from "./BalanceCertificateForm";
import RequestMailHoldForm from "./RequestMailHoldForm";
import CloseAccountForm from "./CloseAccountForm";
import SalaryTransferForm from "./SalaryTransferForm";
import PensionTransferForm from "./PensionTransferForm";
import CustomerCenterPrintForm from "./CustomerCenterPrintForm";

export const serviceFormRegistry: Record<string, React.ComponentType> = {
  "فتح حساب": OpenAccountForm,
  "تحديث بيانات": UpdateDataForm,
  "طباعة كشف حساب": PrintStatementForm,
  "طباعة شهادة بالآرصده": BalanceCertificateForm,
  "طلب حفظ مراسلات": RequestMailHoldForm,
  "طلب اغلاق حساب": CloseAccountForm,
  "طلب تحويل مرتب": SalaryTransferForm,
  "طلب تحويل معاش": PensionTransferForm,
  "طباعة مركز عميل": CustomerCenterPrintForm,
};


