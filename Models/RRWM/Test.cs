﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using R2.RRDL.Models;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 任务序号
    /// </summary>
    public class TestTest
    {
        private int serialNumber = 0;

        public int SerialNumber
        {
            get { return serialNumber; }
            set { serialNumber = value; }
        }

        [Key]
        public int ID { get; set; }

        public string Year { get; set; }
    }

}