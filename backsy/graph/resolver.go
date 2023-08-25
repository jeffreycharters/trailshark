package graph

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/jeffreycharters/trailshark/backsy/ent"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB *ent.Client
}

func NewResolver(db *ent.Client) *Resolver {
	return &Resolver{
		DB: db,
	}
}

func NewGraphQLServer(db *ent.Client) *handler.Server {
	return handler.NewDefaultServer(NewExecutableSchema(Config{Resolvers: NewResolver(db)}))
}
