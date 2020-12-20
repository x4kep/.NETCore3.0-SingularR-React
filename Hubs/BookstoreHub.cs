using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace EuroDeskBookstoresAssigment.Hubs
{
    public class BookstoreHub : Hub
    {
        public async override Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("EstablishConnection", "Connected successfully!");
        }
    }
}
