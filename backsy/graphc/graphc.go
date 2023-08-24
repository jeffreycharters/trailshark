//go:build ignore
// +build ignore

package main

import (
	"fmt"
	"io"
	"log"
	"os"

	"github.com/99designs/gqlgen/api"
	"github.com/99designs/gqlgen/codegen"
	"github.com/99designs/gqlgen/codegen/config"
	"github.com/vektah/gqlparser/v2/formatter"
)

func init() {
	log.SetOutput(io.Discard)
}

func main() {
	cfg, err := config.LoadConfigFromDefaultLocations()
	if err != nil {
		fmt.Fprintln(os.Stderr, "failed to load config", err.Error())
		os.Exit(2)
	}

	err = api.Generate(cfg, api.AddPlugin(OutputSchemaPlugin{}))

	if err != nil {
		fmt.Fprintln(os.Stderr, err.Error())
		os.Exit(3)
	}
}

type OutputSchemaPlugin struct{}

func (OutputSchemaPlugin) Name() string { return "OutputSchemaPlugin" }

func (OutputSchemaPlugin) GenerateCode(cfg *codegen.Data) error {
	f, err := os.Create("schema.gql")
	if err != nil {
		return err
	}
	defer f.Close()

	fmtr := formatter.NewFormatter(f)
	fmtr.FormatSchema(cfg.Schema)

	return nil
}
