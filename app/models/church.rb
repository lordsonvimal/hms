class Church < ApplicationRecord
  validates :name, :place, presence: true
end
