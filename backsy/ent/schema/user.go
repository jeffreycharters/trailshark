package schema

import (
	"regexp"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
	"github.com/jeffreycharters/trailshark/backsy/pkg/ulid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").
			GoType(ulid.ID("")).
			DefaultFunc(ulid.Make).
			Immutable().
			Unique(),
		field.String("username").
			Match(regexp.MustCompile(`^[a-zA-Z0-9_]+$`)).
			MinLen(2).
			MaxLen(20).
			Unique(),
		field.String("email").
			Unique(),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}

func (User) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
