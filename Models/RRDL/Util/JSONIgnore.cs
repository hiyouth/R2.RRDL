using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace R2.RRDL.Models.Util
{
    public class ExcludePropertiesContractResolver : DefaultContractResolver
    {
        IEnumerable<string> lstExclude;
        public ExcludePropertiesContractResolver(IEnumerable<string> excludedProperties)
        {
            lstExclude = excludedProperties;
        }
        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            return base.CreateProperties(type, memberSerialization).ToList().FindAll(p => !lstExclude.Contains(p.PropertyName));
        }
    }

}