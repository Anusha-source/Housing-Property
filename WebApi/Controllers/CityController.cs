using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
       public CityController()
       {

       }
        // GET api/city
        [HttpGet ("")]
public ActionResult<IEnumerable<string>> Getstrings()
{
    return new string [] {"Atlanta", "new york" };
}
    }
}