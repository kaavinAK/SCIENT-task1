import DatePicker from "@mui/lab/DatePicker";
import PickersDay, {
  PickersDayProps,
  pickersDayClasses
} from "@mui/lab/PickersDay";

export let renderWeekPickerDay = (
  date,
  selectedDates,
  pickersDayProps
) => {
  return (
    <PickersDay
      {...pickersDayProps}
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: "green"
        }
      }}
    />
  );
};