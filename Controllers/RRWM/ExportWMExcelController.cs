using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;
using R2.RRWM.BusinessModel;
using R2.RRWM.Models;

namespace R2.RRDL.Controllers.RRWM
{
    public class ExportWMExcelController : Controller
    {
        /// <summary>
        ///一个函数获取需要的工时列表/ 
        /// </summary>
        /// <returns></returns>
        public List<Task> GetTask() {            
            TaskService ts = new TaskService();
            List<Task> taskList = ts.FindByUserGroup(2);
            return taskList;
        }



        /// <summary>
        /// 传入工时列表，导入到Excel中去
        /// </summary>
        /// <returns></returns>
        public string ExportCurrentWeekWMInfo(){
            List<Task> taskList = GetTask();

            Excel.Application excelApp = new Excel.Application();
            Excel.Workbook workBook = excelApp.Workbooks.Add(true);
            Excel.Worksheet worksheet = workBook.ActiveSheet as Excel.Worksheet;
            try
            {
               

                Excel.Range titleRange = worksheet.Range["A1", "Y2"];
                titleRange.Merge();
                titleRange.Font.Bold = true;
                titleRange.Font.Color = 16;
                titleRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;//水平居中  
                titleRange.VerticalAlignment = Excel.XlVAlign.xlVAlignCenter;//垂直居中  
                titleRange.Borders.LineStyle = Excel.XlLineStyle.xlContinuous;//设置边框  
                titleRange.Borders.Weight = Excel.XlBorderWeight.xlThin;//边框常规粗细 
                titleRange.EntireColumn.AutoFit();
                titleRange.Value = "武汉中地数码地质灾害事业部R2Team工时导出表";

                string[] headArr = { "ID", "TaskProcessStatus", "Month", "Year", "ConfirmedTime", "RecordTime", "ProjectID", "TaskType",
                                       "TaskCategory", "TaskTitle", "TaskContent", "TaskFinishStandard", "ScheduledBonus",
                                       "Bonus", "TaskerID", "ScheduledStartTime", "ScheduledFinishTime", "ConfirmedFinishTime", "UsedHours",
                                       "TaskStatus", "CheckedTime", "QualityFactor", "Week", "CheckerID", "Memo" };
                Excel.Range headRange = worksheet.Range["A4","Y4"];
                headRange.Font.Name = "Times New Roman";
                headRange.Font.Size = 12;
                headRange.Font.Bold = false;
                
                for (int i = 1; i < 26;i++ )
                {
                    headRange.Cells[4, i] = headArr[i - 1];
                }


                int length = taskList.Count;
                for (int i = 5; i < 5 + length;i++ )
                    for (int j = 1; j < 26; j++)
                    {
                        headRange.Cells[i-3, 1] = taskList[i - 5].ID;
                        headRange.Cells[i-3, 2] = taskList[i - 5].TaskProcessStatus;
                        headRange.Cells[i-3, 3] = taskList[i - 5].Month;
                        headRange.Cells[i-3, 4] = taskList[i - 5].Year;
                        headRange.Cells[i-3, 5] = taskList[i - 5].ConfirmedTime;
                        headRange.Cells[i-3, 6] = taskList[i - 5].RecordTime;
                        headRange.Cells[i-3, 7] = taskList[i - 5].ProjectID;
                        headRange.Cells[i-3, 8] = taskList[i - 5].TaskType;
                        headRange.Cells[i-3, 9] = taskList[i - 5].TaskCategory;
                        headRange.Cells[i-3, 10] = taskList[i - 5].TaskTitle;                        
                        headRange.Cells[i-3, 11] = taskList[i - 5].TaskContent; 
                        headRange.Cells[i-3, 12] = taskList[i - 5].TaskFinishStandard;
                        headRange.Cells[i-3, 13] = taskList[i - 5].ScheduledBonus;
                        headRange.Cells[i-3, 14] = taskList[i - 5].Bonus;                                                
                        headRange.Cells[i-3, 15] = "'" + taskList[i - 5].TaskerID.ToString();
                        headRange.Cells[i-3, 16] = taskList[i - 5].ScheduledStartTime;
                        headRange.Cells[i-3, 17] = taskList[i - 5].ScheduledFinishTime;
                        headRange.Cells[i-3, 18] = taskList[i - 5].ConfirmedFinishTime;
                        headRange.Cells[i-3, 19] = taskList[i - 5].UsedHours; 
                        headRange.Cells[i-3, 20] = taskList[i - 5].TaskStatus;
                        headRange.Cells[i-3, 21] = taskList[i - 5].CheckedTime;
                        headRange.Cells[i-3, 22] = taskList[i - 5].QualityFactor;
                        headRange.Cells[i-3, 23] = taskList[i - 5].Week;
                        headRange.Cells[i-3, 24] = "'" + taskList[i - 5].CheckerID.ToString();
                        headRange.Cells[i-3, 25] = taskList[i - 5].Memo;
                    }
                headRange.EntireColumn.AutoFit();
                string filePath = Server.MapPath("~/Files/Temp/");
                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);
                string downFileName = "工时导出表_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx";
                // 输出Excel文件并退出 
                if (System.IO.File.Exists(downFileName)) //如果文件存在，就覆盖
                    System.IO.File.Delete(downFileName);
                workBook.SaveAs(filePath + downFileName, Excel.XlFileFormat.xlWorkbookDefault); //保存成**格式]
                //workBook.Save();
                workBook.Close(null, null, null);
                excelApp.Visible = true;
                excelApp.Workbooks.Close();
                excelApp.Application.Quit();
                excelApp.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(worksheet);
                System.Runtime.InteropServices.Marshal.ReleaseComObject(workBook);
                System.Runtime.InteropServices.Marshal.ReleaseComObject(excelApp);
                worksheet = null;
                workBook = null;
                excelApp = null;
                GC.Collect();
                return (filePath + downFileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }     

        }
    }
}
