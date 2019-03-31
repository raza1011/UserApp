using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RedCodeTestApp.Models;
using System;
using System.Threading.Tasks;

namespace RedCodeTestApp.Controllers
{
    public class UserController : Controller
    {
        private readonly UserDbContext _context;

        public UserController(UserDbContext context) //contstructor to initialize db context (dependency injection)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()  // index page to show the list of users
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Get()  // get all users
        {
            var list = await _context.User.ToListAsync(); // list of all users
            return Json(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int? id)  // get specific user by id
        {
            if (id == null)
                return NotFound();
            var user = await GetUserById(id); // get user by id
            return Json(user);
        }

        [HttpGet]
        public IActionResult Add() //add page 
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]UserModel model) //add users to database  
        {
            var flag = 0;
            try
            {
                _context.Add(model);  // add user model to context
                flag = await _context.SaveChangesAsync();   // save to database
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return Json(flag);
        }

        [HttpGet]
        public IActionResult Edit(int? id) // edit page
        {
            ViewBag.Id = id;
            return View();
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody]UserModel model)  // action resutl to edit user
        {
            int flag = 0;
            try
            {
                _context.Update(model);
                flag = await _context.SaveChangesAsync();  // save change to database 
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }

            return Json(flag);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int? id)  // delete user
        {
            var flag = 0;
            if (id == null)
                return NotFound();
            var user = await GetUserById(id); // find the user by id
            if (user != null)
            {
                try
                {
                    _context.User.Remove(user);  // remove from db context
                    flag = await _context.SaveChangesAsync();  // save changes to database
                }
                catch (Exception ex)
                {

                    throw ex;
                }

            }
            return Json(flag);
        }

        public async Task<UserModel> GetUserById(int? id)
        {
            return await _context.User.FirstOrDefaultAsync(x => x.Id == id);
        }

    }
}