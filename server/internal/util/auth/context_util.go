
package auth

import "context"

// contextKey is a custom type to avoid collisions
type contextKey string

const userIDKey contextKey = "userID"

// SetUserIDInContext adds the user ID to the context
func SetUserIDInContext(ctx context.Context, userID string) context.Context {
	return context.WithValue(ctx, userIDKey, userID)
}

// GetUserIDFromContext retrieves the user ID from context
func GetUserIDFromContext(ctx context.Context) string {
	if ctx == nil {
		return ""
	}
	if uid, ok := ctx.Value(userIDKey).(string); ok {
		return uid
	}
	return ""
}
