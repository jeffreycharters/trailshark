package main

import (
	"fmt"
	"net/http"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/jeffreycharters/trailshark/backsy/graph"
	"github.com/jeffreycharters/trailshark/backsy/internal/config"
	"github.com/jeffreycharters/trailshark/backsy/internal/db"
)

func main() {
	r := chi.NewRouter()

	cfg := config.New()
	db := db.New(cfg)

	srv := graph.NewGraphQLServer(db)

	r.Handle("/api/playground", playground.Handler("GraphQL playground", "/api/query"))
	r.Handle("/api/query", srv)

	fmt.Println("Starting server on port 3322")
	http.ListenAndServe((":3322"), r)
}
