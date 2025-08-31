package razorpay

import (
	"fmt"

	"github.com/razorpay/razorpay-go"
)

// CreateRazorpayOrder calls the API and returns a message.
func CreateRazorpayOrder() string {
	// API Keys
	client := razorpay.NewClient("keyId", "keySecret")

	data := map[string]interface{}{
		"amount":   100,
		"currency": "INR",
		"receipt":  "receipt_0001",
	}

	body, err := client.Order.Create(data, nil)

	if err != nil {
		fmt.Println(err)
		return ""
	}
	return fmt.Sprintf("%v", body)
}
