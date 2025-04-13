package storage

import "context"

type Storage[T any, ID comparable] interface {
	Create(ctx context.Context, item T) error
	Get(ctx context.Context, id ID) (T, error)
	Update(ctx context.Context, item T) error
	Delete(ctx context.Context, id ID) error
}
