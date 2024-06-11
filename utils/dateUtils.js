export const getYesterdayDate = () => {
   const mailSubjectDate = new Date();
   mailSubjectDate.setDate(mailSubjectDate.getDate() - 1);
  return mailSubjectDate;
};

export function getDates() {
  const currentDate = new Date();
  const yesterday = new Date();
  yesterday.setDate(currentDate.getDate() -1);

  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() +1);
  
  const startDateTimeString = yesterday.toISOString().split("T")[0];
  const endDateTimeString = tomorrow.toISOString().split("T")[0];

  return {yesterday:startDateTimeString, tomorrow:endDateTimeString}
}
