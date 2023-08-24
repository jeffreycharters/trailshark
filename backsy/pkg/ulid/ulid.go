package ulid

import (
	"database/sql/driver"
	"fmt"
	"io"
	"strconv"

	"github.com/oklog/ulid/v2"
	"github.com/samber/lo"
)

type ID string

func Make() ID {
	return ID(ulid.Make().String())
}

// Value implements the driver Valuer interface.
func (u *ID) Value() (driver.Value, error) {
	return string(*u), nil
}

// UnmarshalULID implements the graphql.Unmarshaler interface.
func (u *ID) UnmarshalULID(v any) error {
	return u.Scan(v)
}

// MarshalULID implements the graphql.Marshaler interface.
func (u *ID) MarshalULID(w io.Writer) {
	lo.Must(io.WriteString(w, strconv.Quote(string(*u))))
}

// Scan implements the Scanner interface.
func (u *ID) Scan(src any) error {
	if src == nil {
		return fmt.Errorf("ulid: expected a value, received nil")
	}

	switch s := src.(type) {
	case string:
		*u = ID(s)
	case ID:
		*u = s
	default:
		return fmt.Errorf("ulid: expected a string, received %T", src)
	}

	return nil
}
