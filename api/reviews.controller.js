import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _email: req.body.user_email
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
            restaurantId,
            userInfo,
            review,
            date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_email,
                text,
                date,
            )

            var { error } = reviewResponse
            if(error) {
                res.status(400).json({ error })
            }

            if(reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to updater review - user may not be original poster",
                )
            }

            res.json({ status : "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userEmail = req.body.user_email
            console.log(reviewId)
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userEmail,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}