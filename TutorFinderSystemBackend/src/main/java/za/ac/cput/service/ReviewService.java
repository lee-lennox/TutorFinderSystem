package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Review;
import za.ac.cput.repository.ReviewRepository;

import java.util.List;
import java.util.Optional;
@Service
public class ReviewService implements IReviewService {
@Autowired
private ReviewRepository reviewRepository;

public ReviewService(ReviewRepository reviewRepository)
{
    this.reviewRepository = reviewRepository;
}

    @Override
    public Optional<Review> findById(Long aLong) {
        return reviewRepository.findById(aLong);
    }

    @Override
    public Optional<Review> findByName(String name) {
        return reviewRepository.findByName(name);
    }

    @Override
    public Review save(Review entity) {
        return reviewRepository.save(entity);
    }

    @Override
    public Review update(Review entity) {
        return reviewRepository.save(entity);
    }

    @Override
    public void deleteById(Long aLong) {
        reviewRepository.deleteById(aLong);
    }

    @Override
    public Review read(Long aLong) {
        return reviewRepository.findById(aLong).get();
    }

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }
}
