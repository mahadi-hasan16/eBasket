﻿using Ebasket.Core.Entities;
using Ebasket.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ebasket.Infrastructure.Data
{
    public class GenericRepository<T>(StoreContext storeContext) : IGenericRepository<T> where T : BaseEntity
    {
        public void Add(T entity)
        {
            storeContext.Set<T>().Add(entity);
        }

        public void Remove(T entity)
        {
            storeContext.Set<T>().Remove(entity);
        }

        public bool Exists(int id)
        {
            return storeContext.Set<T>().Any(x => x.Id == id);
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await storeContext.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await storeContext.Set<T>().ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await storeContext.SaveChangesAsync() > 0;
        }

        public void Update(T entity)
        {
            storeContext.Set<T>().Attach(entity);   
            storeContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
