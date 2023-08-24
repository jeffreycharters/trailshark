package db

import (
	"context"
	"log"

	"entgo.io/ent/dialect"
	"github.com/jeffreycharters/trailshark/backsy/ent"
	"github.com/jeffreycharters/trailshark/backsy/internal/config"

	_ "github.com/lib/pq"
)

func New(cfg *config.Config) *ent.Client {
	client, err := ent.Open(dialect.Postgres, cfg.DB_DSN)
	if err != nil {
		log.Fatalf("failed opening connection to db: %v", err)
	}

	ctx := context.Background()

	// Run the automatic migration tool to create all schema resources.
	if err := client.Schema.Create(ctx); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	return client
}
