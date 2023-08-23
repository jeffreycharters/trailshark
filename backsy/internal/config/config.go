package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DB_DSN string
}

func New() *Config {
	env := os.Getenv("BACKSY_ENV")

	if env == "" {
		env = "dev"
	}

	err := godotenv.Load(".env." + env)
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return &Config{
		DB_DSN: os.Getenv("BACKSY_DATABASE_DSN"),
	}
}
