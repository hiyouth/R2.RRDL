using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.RRDL
{
    public class ContactPerson : MyAutoMapper
    {
        [Key]
        public String ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string UserGroupName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CompanyEmail { get; set; }
        [Required]
        public string QQ { get; set; }
        [Required]
        public string Address { get; set; }
        public string desc { get; set; }
        public DateTime? AddTime { get; set; }

    }
}