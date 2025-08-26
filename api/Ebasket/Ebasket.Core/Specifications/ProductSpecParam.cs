using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ebasket.Core.Specifications
{
    public class ProductSpecParam
    {
        #region Public Fields
        public int PageIndex { get; set; } = 1;
        public string? Sort { get; set; }
        #endregion

        #region Private Fields
        private const int maxPageSize = 50;
        private int _pageSize = 6;
        private List<string> _brands = [];
        private List<string> _types = [];
        #endregion

        #region Public Properties
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
        public List<string> Brands
        {
            get => _brands;
            set
            {
                _brands = value.SelectMany(x => x.Split(",", StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }
        public List<string> Types
        {
            get => _types;
            set
            {
                _types = value.SelectMany(x => x.Split(",", StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }
        #endregion
    }
}
