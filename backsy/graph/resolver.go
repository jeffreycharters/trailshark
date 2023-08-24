package graph

import "github.com/jeffreycharters/trailshark/backsy/ent"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB *ent.Client
}
