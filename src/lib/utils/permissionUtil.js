import { APPFUNPERID } from "../enums/the-coin/permission";

export const isPermissionAll = (value) => {
    return value == APPFUNPERID.FP_01
};
export const isPermissionRead = (value) => {
    return value == APPFUNPERID.FP_02
};
export const isPermissionReadWrite = (value) => {
    return value == APPFUNPERID.FP_03
};
export const isPermissionDelete = (value) => {
    return value == APPFUNPERID.FP_04
};
