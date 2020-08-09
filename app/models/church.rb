class Church < ApplicationRecord
  validates :title, :place, presence: true
end
