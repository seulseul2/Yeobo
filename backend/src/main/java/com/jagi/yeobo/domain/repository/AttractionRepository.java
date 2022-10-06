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

    @Query(value = "SELECT a.attraction_id,a.name,s.score,a.image FROM attraction a left join score s on s.user_id = :userId and a.attraction_id = s.attraction_id where a.name LIKE :name ORDER BY CASE WHEN a.name = :name0 THEN 0 WHEN a.name LIKE :name1 THEN 1 WHEN a.name LIKE :name2 THEN 2 WHEN a.name LIKE :name3 THEN 3 ELSE 4 END",nativeQuery = true)
    public List<Object[]> searchAttractionList(String name, long userId);
}
