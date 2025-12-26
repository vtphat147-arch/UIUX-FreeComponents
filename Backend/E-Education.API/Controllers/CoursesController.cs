using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using E_Education.API.Data;
using E_Education.API.Models;

namespace E_Education.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses(
            [FromQuery] string? search,
            [FromQuery] string? category)
        {
            var query = _context.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(c => 
                    c.Title.ToLower().Contains(search.ToLower()) ||
                    c.Instructor.ToLower().Contains(search.ToLower()));
            }

            if (!string.IsNullOrEmpty(category) && category != "all")
            {
                query = query.Where(c => c.Category == category);
            }

            var courses = await query.OrderByDescending(c => c.CreatedAt).ToListAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }
    }
}
