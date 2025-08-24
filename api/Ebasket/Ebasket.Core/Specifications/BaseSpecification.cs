using Ebasket.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Ebasket.Core.Specifications
{
    public class BaseSpecification<T>(Expression<Func<T, bool>>? criteria) : ISpecification<T>
    {
        protected BaseSpecification() : this(null) { }
        public Expression<Func<T, bool>>? Criteria => criteria;
        public Expression<Func<T, object>>? OrderBy { get; private set; }
        public Expression<Func<T, object>>? OrderByDescending { get; private set; }
        public bool IsDistinct { get; private set; }
        public int Take {  get; private set; }
        public int Skip {  get; private set; }
        public bool IsPagingEnabled {  get; private set; }

        #region Class Methods
        protected void AddOrderBy(Expression<Func<T, object>> orderBy) => OrderBy = orderBy;
        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescending) => OrderBy = orderByDescending;
        protected void ApplyDistinct() => IsDistinct = true;

        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
        #endregion
    }

    public class BaseSpecification<T, TResult>(Expression<Func<T, bool>> criteria) : BaseSpecification<T>(criteria), ISpecification<T, TResult>
    {
        protected BaseSpecification() : this(null!){}
        public Expression<Func<T, TResult>>? Select { get; private set; }

        #region Class Methods
        protected void AddSelect(Expression<Func<T, TResult>> selectExpression) => Select = selectExpression;
        #endregion
    }
}
