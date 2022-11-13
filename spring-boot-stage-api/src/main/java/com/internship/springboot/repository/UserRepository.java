package com.internship.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.internship.springboot.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  @Query("select u from User u where u.id = ?1")
  User findUserById(Long userId);



  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}
