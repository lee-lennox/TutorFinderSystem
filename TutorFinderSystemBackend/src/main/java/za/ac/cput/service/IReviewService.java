package za.ac.cput.service;

import za.ac.cput.domain.Review;

import java.util.Optional;

public interface IReviewService extends IService<Review,Long>{

    Optional<Review> findById(Long aLong);
    Optional<Review>findByName(String name);
}
