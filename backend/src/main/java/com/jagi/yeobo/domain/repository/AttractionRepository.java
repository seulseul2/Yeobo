package com.jagi.yeobo.domain.repository;


import com.jagi.yeobo.domain.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AttractionRepository extends JpaRepository<Attraction,Long> {

    Optional<Attraction> findById(Long id);

//    @Query(value = "SELECT * FROM Attraction a WHERE a.name LIKE :name")
    List<Attraction> findAllByName(String name);

}
