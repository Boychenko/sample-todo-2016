﻿namespace Todo.IdentityServer.IdServer
{
    using System.Collections.Generic;
    using IdentityServer3.Core;
    using IdentityServer3.Core.Models;

    public class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "Todo Sample",
                    Enabled = true,
                    ClientId = "todoSample",
                    Flow = Flows.Implicit,
                    ClientUri = "https://github.com/Boychenko/sample-todo-2016",
                    LogoUri = "https://s.gravatar.com/avatar/e371b4f2e325e686190e1234333bb083?s=80",
                    RequireConsent = true,
                    AllowRememberConsent = false,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:3000/callback",
                    },
                    AllowedScopes = new List<string>
                    {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        Constants.StandardScopes.Email,
                    },

                    AccessTokenType = AccessTokenType.Jwt,
                    IdentityTokenLifetime = 300,
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}