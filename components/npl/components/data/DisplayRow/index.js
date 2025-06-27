import { Tooltip } from "@mui/material";
import { emptyValues } from "@/lib/patterns/validationPatterns";
import Skeleton from "../../form/Skeleton";

function DisplayRow({ label, value, loading, tooltip = false }) {
  // console.log(label, value)
  return (
    <div className="flex flex-wrap items-center">
      <span className="font-medium text-sm w-full sm:w-[250px]">{label} :</span>
      {loading ? (
        <Skeleton className="w-24 h-4" />
      ) : (
        tooltip ?
          <Tooltip title={!emptyValues.includes(value) ? value : ''} placement="bottom-start">
            <span className="cursor-pointer flex-1 text-sm truncate overflow-hidden whitespace-nowrap">
              {!emptyValues.includes(value) ? value : '-'}
            </span>
          </Tooltip>


          :
          <span className="flex-1 text-sm">{!emptyValues.includes(value) ? value : '-'}</span>

      )}
    </div>
  );
}

export default DisplayRow;
