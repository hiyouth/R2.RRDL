using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.RRDL
{
    /// <summary>
    /// 用于浅度复制，功能类似于著名的automapper
    /// </summary>
    public abstract partial class MyAutoMapper
    {
        public virtual void CopyModel(object from)
        {
            if (from == null || this == null) return;
            PropertyDescriptorCollection fromProperties = TypeDescriptor.GetProperties(from);
            PropertyDescriptorCollection toProperties = TypeDescriptor.GetProperties(this);
            foreach (PropertyDescriptor fromProperty in fromProperties)
            {
                var fromValue = fromProperty.GetValue(from);
                PropertyDescriptor toProperty = toProperties.Find(fromProperty.Name, true /* ignoreCase */);
                if (toProperty != null && !toProperty.IsReadOnly)
                {
                    bool isDirectlyAssignable = toProperty.PropertyType.IsAssignableFrom(fromProperty.PropertyType);
                    bool liftedValueType = (isDirectlyAssignable) ? false : (Nullable.GetUnderlyingType(fromProperty.PropertyType) == toProperty.PropertyType);
                    if (isDirectlyAssignable || liftedValueType)
                    {
                        if (isDirectlyAssignable || (fromValue != null && liftedValueType))
                        {
                            toProperty.SetValue(this, fromValue);
                        }
                    }
                }
            }
        }
    }
}