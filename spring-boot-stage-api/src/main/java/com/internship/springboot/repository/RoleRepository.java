package com.internship.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.internship.springboot.models.ERole;
import com.internship.springboot.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);

  @Query("select r from Role r where r.id = ?1")
  Role findRoleById(Integer roleId);
}
